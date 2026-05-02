package no.hvl.dat251.backend.repository

import no.hvl.dat251.backend.entity.Student
import org.springframework.data.repository.CrudRepository
import java.util.Optional

interface StudentRepository : CrudRepository<Student, Long> {
    fun findByUsername(username: String): Optional<Student>

    fun findByEmail(email: String): Optional<Student>
}