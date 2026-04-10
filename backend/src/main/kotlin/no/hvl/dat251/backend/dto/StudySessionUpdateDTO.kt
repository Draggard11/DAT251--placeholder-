package no.hvl.dat251.backend.dto

import java.util.Date

data class StudySessionUpdateDTO (
    val subject: String? = null,
    val startTime: Date? = null,
    val endTime: Date? = null,
    val location: String? = null,
    val completed: Boolean? = null,
    val studyGroupId: Long? = null,
    var attendanceIds: MutableSet<Long>? = null
)
