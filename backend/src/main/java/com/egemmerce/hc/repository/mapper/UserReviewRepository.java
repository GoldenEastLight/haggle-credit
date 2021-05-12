package com.egemmerce.hc.repository.mapper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.egemmerce.hc.repository.dto.UserReview;

@Transactional
public interface UserReviewRepository extends JpaRepository<UserReview, Long>{

	List<UserReview> findAllByurUserNo(int urUserNo);

	UserReview findByurNo(int urNo);

}