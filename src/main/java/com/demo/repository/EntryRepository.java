package com.demo.repository;

import com.demo.domain.Entry;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Entry entity.
 */
public interface EntryRepository extends JpaRepository<Entry,Long> {

}
