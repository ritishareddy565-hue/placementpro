package placementpro_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import placementpro_backend.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
