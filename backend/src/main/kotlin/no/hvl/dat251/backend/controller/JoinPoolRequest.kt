package no.hvl.dat251.backend.controller

data class JoinPoolRequest(
    val studentId: Long,
    val preferredStudentIds: List<Long> = emptyList()
)