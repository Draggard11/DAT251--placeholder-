package no.hvl.dat251.backend.dto


data class StudyGroupUpdateDTO(
    val name: String? = null,

    val studentsIds: List<Long>? = null,
    val studySessionsIds: List<Long>? = null
)