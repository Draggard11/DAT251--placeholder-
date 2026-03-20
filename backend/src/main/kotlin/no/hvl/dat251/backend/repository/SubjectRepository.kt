package no.hvl.dat251.backend.repository

import no.hvl.dat251.backend.entity.Subject
import org.springframework.data.repository.CrudRepository

interface SubjectRepository : CrudRepository<Subject, Long> {
}