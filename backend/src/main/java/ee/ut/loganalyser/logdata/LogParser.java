package ee.ut.loganalyser.logdata;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.Charset;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@NoArgsConstructor
public class LogParser {

    private final static Pattern lineStartPattern = Pattern.compile("^\\d\\d\\d\\d-\\d\\d-\\d\\d \\d\\d:\\d\\d:\\d\\d\\.\\d\\d\\d.*");


    public static List<StudentLogs> parseZip(MultipartFile logs, Date start, Date end) throws IOException {

        Map<String, StudentLogs> parsedLogs = new HashMap<>();

        if (logs.getOriginalFilename().endsWith(".zip")) {
            try (ZipInputStream inputStream = new ZipInputStream(logs.getInputStream(), Charset.forName("CP437"))) {
                ZipEntry entry;
                while ((entry = inputStream.getNextEntry()) != null) {
                    if (entry.isDirectory()) {
                        continue;
                    }
                    try {
                        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));

                        String entryName = getStudentName(entry.getName());

                        if (!parsedLogs.containsKey(entryName)) {
                            parsedLogs.put(entryName, new StudentLogs(entryName));
                        }
                        StudentLogs studentLogs = parsedLogs.get(entryName);
                        if (entry.getName().endsWith(".json")) {
                            studentLogs.addFileName(getFileName(entry.getName()));
                            studentLogs.addAllLogs(parseJsonLog(br, start, end));
                        } else if (entry.getName().endsWith(".log")) {
                            studentLogs.addFileName(getFileName(entry.getName()));
                            studentLogs.addAllLogs(parsePlainTextLog(br, start, end));
                        }
                    } finally {
                        inputStream.closeEntry();
                    }
                }
            } catch (IOException e) {
                throw new RuntimeException("Failed to parse logs: " + e);
            }
        } else {
            throw new IOException("Invalid file format: " + logs.getContentType());
        }
        return parsedLogs.values().stream().toList();
    }

    public static List<LogData> parseSingle(MultipartFile log, Date start, Date end) {

        try (BufferedReader br = new BufferedReader(new InputStreamReader(log.getInputStream()))) {
            if (log.getOriginalFilename().endsWith(".json")) {
                return parseJsonLog(br, start, end);
            } else if (log.getOriginalFilename().endsWith(".log")) {
                return parsePlainTextLog(br, start, end);
            } else {
                throw new RuntimeException("Invalid file format: " + log.getContentType());
            }
        } catch (IOException e) {
            throw new RuntimeException("Unable to parse log file: " + e);
        }
    }

    private static List<LogData> parseJsonLog(BufferedReader br, Date start, Date end) throws IOException {
        List<LogData> parsedLogFile = new ArrayList<>();

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        String line;

        while ((line = br.readLine()) != null) {
            if (!line.isBlank()) {
                if (start != null && end != null) {
                    try {
                        Date logTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(line.substring(14, 33));

                        if (logTime.before(start)) {
                            continue;
                        }
                        if (logTime.after(end)) {
                            break;
                        }
                    } catch (ParseException e) {
                        System.out.println("Unable to parse date: " + e + line);
                    }
                }
                LogData logData = mapper.readValue(line, LogData.class);
                if ((logData.getErrorSeverity() != ErrorSeverity.LOG && logData.getStatement() != null) || isByStudent(logData)) {
                    parsedLogFile.add(logData);
                }
            }
        }

        return parsedLogFile;
    }

    private static List<LogData> parsePlainTextLog(BufferedReader br, Date start, Date end) {
        List<LogData> parsedLogFile = new ArrayList<>();

        LogData currentLogData = new LogData();
        String[] lines = br.lines().toArray(String[]::new);

        for (String line : lines) {

            if (!line.isBlank()) {
                if (lineStartPattern.matcher(line).matches()) {
                    if (line.contains("ERROR:")) {
                        if (start != null && end != null) {
                            try {
                                Date logTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(line.substring(0, 19));
                                if (logTime.before(start)) {
                                    continue;
                                }
                                if (logTime.after(end)) {
                                    break;
                                }
                            } catch (ParseException e) {
                                throw new RuntimeException("Unable to parse date: " + e);
                            }
                        }
                        if (currentLogData.getErrorSeverity() != null && currentLogData.getStatement() != null) {
                            parsedLogFile.add(currentLogData);
                        }
                        currentLogData = new LogData(ErrorSeverity.ERROR, line.split("ERROR:")[1].strip());
                    } else if (line.contains("STATEMENT:") && currentLogData.getStatement() == null) {
                        currentLogData.setStatement(line.split("STATEMENT:")[1].strip());
                    } else if (line.contains("HINT:")) {
                        currentLogData.setHint(line.split("HINT:")[1].strip());
                    } else if (line.contains("DETAIL:")) {
                        currentLogData.setDetail(line.split("DETAIL:")[1].strip());
                    }
                } else {
                    currentLogData.setStatement(currentLogData.getStatement() + "\n" + line);
                }
            }
        }
        if (currentLogData.getErrorSeverity() != null && currentLogData.getStatement() != null) {
            parsedLogFile.add(currentLogData);
        }
        return parsedLogFile;
    }

    private static boolean isByStudent(LogData logData) {
        if (logData.getMessage().startsWith("execute <")) {
            logData.setStatement(logData.getMessage().split(": ", 2)[1]);
            return !logData.getStatement().startsWith("SET")
                    && !logData.getStatement().toLowerCase().startsWith("show")
                    && !logData.getStatement().contains("pg_")
                    && !logData.getStatement().contains("session_user")
                    && !logData.getStatement().contains("version()");
        }
        return false;
    }

    private static String getFileName(String pathName) {
        int start = pathName.lastIndexOf("/");
        return pathName.substring(start + 1);
    }

    private static String getStudentName(String pathName) {
        int splitIndex;
        if ((splitIndex = pathName.indexOf("_")) != -1 || (splitIndex = pathName.indexOf("/")) != -1) {
            return pathName.substring(0, splitIndex);
        }
        return pathName;
    }

}