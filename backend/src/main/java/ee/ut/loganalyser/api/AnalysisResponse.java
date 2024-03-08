package ee.ut.loganalyser.api;

import ee.ut.loganalyser.analysis.Analysis;
import ee.ut.loganalyser.analysis.AnalysisSummary;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class AnalysisResponse {

    private List<Analysis> analysis;
    private AnalysisSummary summary;
}
