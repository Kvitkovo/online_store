package ua.kvitkovo.decor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ua.kvitkovo.decor.entity.Decor;
import ua.kvitkovo.decor.entity.DecorStatus;

import java.util.List;

@Repository
public interface DecorRepository extends DecorRepositoryBasic {

    Page<Decor> findAllByCustomerId(Pageable pageable, Long id);

    Page<Decor> findAllByCustomerIdAndStatusNotIn(Pageable pageable, Long id, List<DecorStatus> decorStatuses);

    List<Decor> findAllByStatusIn(List<DecorStatus> decorStatuses);
}
