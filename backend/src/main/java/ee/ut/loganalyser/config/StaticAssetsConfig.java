package ee.ut.loganalyser.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticAssetsConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(
                        "/static/img/**",
                        "/static/css/**",
                        "/static/js/**")
                .addResourceLocations(
                        "classpath:/templates/vue/static/img/",
                        "classpath:/templates/vue/static/css/",
                        "classpath:/templates/vue/static/js/");
    }
}