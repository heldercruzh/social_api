package com.example.springsocial.repository;

import com.example.springsocial.model.Role;
import com.example.springsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query(value="SELECT * FROM role tb1 INNER JOIN user_role tb2 ON tb1.nome = tb2.role_id"+
            " WHERE tb2.user_id = :id)"
            , nativeQuery = true)
    Optional<List<Role>> findRoleByIdUser(
            @Param("id") Long id
    );

}
