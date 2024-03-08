package ee.ut.loganalyser.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/")
@Controller
public class FrontendController {
    @GetMapping("/")
    public String frontend() {
        return "vue/index";
    }
}
