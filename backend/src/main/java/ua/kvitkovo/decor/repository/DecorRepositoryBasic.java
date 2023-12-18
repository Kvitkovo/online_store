package ua.kvitkovo.decor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.kvitkovo.decor.entity.Decor;

public interface DecorRepositoryBasic extends JpaRepository<Decor, Long>, JpaSpecificationExecutor {

}
