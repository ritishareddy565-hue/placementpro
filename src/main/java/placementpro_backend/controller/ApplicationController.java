package placementpro_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import placementpro_backend.entity.Application;
import placementpro_backend.repository.ApplicationRepository;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin
public class ApplicationController {

    private final ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping("/test")
    public String test() {
        return "Application Controller is working!";
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Application createApplication(
            @RequestBody Application application) {

        return applicationRepository.save(application);
    }

    @PutMapping("/{id}")
    public Application updateApplication(
            @PathVariable Long id,
            @RequestBody Application application) {

        if (!applicationRepository.existsById(id)) {
            return null;
        }

        application.setId(id);

        return applicationRepository.save(application);
    }

    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {

        if (!applicationRepository.existsById(id)) {
            return "Application not found";
        }

        applicationRepository.deleteById(id);

        return "Application deleted successfully";
    }
}