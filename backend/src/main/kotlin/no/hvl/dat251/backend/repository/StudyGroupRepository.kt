package no.hvl.dat251.backend.repository

import no.hvl.dat251.backend.entity.StudyGroup
import org.springframework.data.repository.CrudRepository

interface StudyGroupRepository : CrudRepository<StudyGroup, Long>