package ee.ut.loganalyser.api;

import ee.ut.loganalyser.logdata.LogParser;
import ee.ut.loganalyser.analysis.Analysis;
import ee.ut.loganalyser.analysis.AnalysisSummary;
import ee.ut.loganalyser.logdata.LogData;
import ee.ut.loganalyser.logdata.StudentLogs;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class AnalysisController {

    @PostMapping(path = "/analysis/zip")
    ResponseEntity<AnalysisResponse> getZipAnalysis(
            @RequestParam MultipartFile logs,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end
    ) throws IOException {

        List<StudentLogs> parsedLogData = LogParser.parseZip(logs, start, end);
        List<Analysis> analyses = new ArrayList<>();
        parsedLogData.forEach(studentLogs -> analyses.add(new Analysis(studentLogs)));
        AnalysisSummary summary = new AnalysisSummary(analyses);

        return ResponseEntity.ok(new AnalysisResponse(analyses, summary));
    }

    @PostMapping(path = "/analysis/single")
    ResponseEntity<Analysis> getSingleAnalysis(
            @RequestParam MultipartFile logs,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end
    ) {
        List<LogData> parsedLog = LogParser.parseSingle(logs, start, end);
        Analysis analysis = new Analysis(parsedLog);
        return ResponseEntity.ok(analysis);
    }
}
