package ee.ut.loganalyser.logdata;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
public class StudentLogs {

    private final String name;
    private String error = null;
    private List<String> fileNames = new ArrayList<>();
    private List<LogData> logs = new ArrayList<>();

    void addFileName(String fileName) {
        this.fileNames.add(fileName);
    }

    void addAllLogs(List<LogData> logs) {
        this.logs.addAll(logs);
    }
}
