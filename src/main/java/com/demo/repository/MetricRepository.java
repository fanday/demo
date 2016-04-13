package com.demo.repository;

import com.demo.domain.Metric;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Metric entity.
 */
public interface MetricRepository extends JpaRepository<Metric,Long> {

    @Query("select distinct metric from Metric metric left join fetch metric.goals")
    List<Metric> findAllWithEagerRelationships();

    @Query("select metric from Metric metric left join fetch metric.goals where metric.id =:id")
    Metric findOneWithEagerRelationships(@Param("id") Long id);

}
