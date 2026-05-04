package no.hvl.dat251.backend.repository

import no.hvl.dat251.backend.entity.Subject
import org.springframework.data.repository.CrudRepository
import java.util.Optional

interface SubjectRepository : CrudRepository<Subject, Long> {
    fun findBySubjectCode(subjectCode: String): Optional<Subject>
}