package no.hvl.dat251.backend.repository

import no.hvl.dat251.backend.entity.Student
import org.springframework.data.jpa.repository.JpaRepository

interface StudentRepository : JpaRepository<Student, Long>