package no.hvl.dat251.backend.entity

import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.ManyToOne
import java.util.Date

@Entity
class StudySession(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    var subject: String? = null,
    var startTime: Date? = null,
    var endTime: Date? = null,
    var completed: Boolean = false,
    @ManyToOne
    @JoinColumn(name = "studygroup_id")
    var studyGroup: StudyGroup? = null,
    @ManyToMany
    @JoinTable(
        name = "session_attendance",
        joinColumns = [JoinColumn(name = "session_id")],
        inverseJoinColumns = [JoinColumn(name = "student_id")]
    )
    var attendance: MutableSet<Student> = mutableSetOf()
)
{

}
