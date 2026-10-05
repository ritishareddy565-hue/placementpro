package placementpro_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import placementpro_backend.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
}
