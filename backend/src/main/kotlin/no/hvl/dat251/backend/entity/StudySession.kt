package no.hvl.dat251.backend.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.util.Date

@Entity
class StudySession(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val subject: String? = null,
    val startTime: Date? = null,
    val endTime: Date? = null,
    val complited: Boolean = false,
)
{

}
