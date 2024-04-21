package ee.ut.loganalyser.analysis;

import lombok.Data;

@Data
public class QueryEventGroup {

    QueryEventGroup(boolean isValid, String time, int queryCount) {
        this.isValid = isValid;
        this.time = time;
        this.count = queryCount;
    }

    boolean isValid;
    String time;
    int count;
}
