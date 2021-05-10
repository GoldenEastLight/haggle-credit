package com.egemmerce.hc.repository.mapper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.egemmerce.hc.repository.dto.ItemPhoto;

@Transactional
public interface ItemPhotoRepository extends JpaRepository<ItemPhoto, Long>{

}
