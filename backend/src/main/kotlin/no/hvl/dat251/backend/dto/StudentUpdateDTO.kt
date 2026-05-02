package no.hvl.dat251.backend.dto

import java.time.LocalDate

data class StudentUpdateDTO(

    val name: String,
    val email: String,

    val password: String,
    val dateOfBirth: LocalDate? = null,
    val enrollmentDate: LocalDate? = null,

    // Use IDs instead of full entities
    val activeSubjectIds: List<Long>? = null,
    val completedSubjectIds: List<Long>? = null,
    val studyGroupIds: List<Long>? = null
)