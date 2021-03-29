package com.example.springsocial.repository;

import com.example.springsocial.model.Role;
import com.example.springsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    /*
    @Query(value="SELECT r FROM User AS u JOIN FETCH u.roles AS r WHERE u.id= :id")
    Optional<Collection<Role>> findRolesById(
            @Param("id") Long id
    );
    */

}
