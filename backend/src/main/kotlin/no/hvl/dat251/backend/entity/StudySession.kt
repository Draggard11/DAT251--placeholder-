package no.hvl.dat251.backend.entity

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.ManyToOne
import no.hvl.dat251.backend.exp.ExpObservervableBase
import java.util.Date
import jakarta.persistence.Temporal
import jakarta.persistence.TemporalType

@Entity
class StudySession(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var subject: String? = null,
    var startTime: Date? = null,
    var endTime: Date? = null,
    var completed: Boolean = false,
    var location: String? = null,

    @Temporal(TemporalType.TIMESTAMP)
    var completedAt: Date? = null,

    @ManyToOne
    @JoinColumn(name = "studygroup_id")
    var studyGroup: StudyGroup? = null,
    @ManyToMany
    @JoinTable(
        name = "session_attendance",
        joinColumns = [JoinColumn(name = "session_id")],
        inverseJoinColumns = [JoinColumn(name = "student_id")],
    )
    var attendance: MutableSet<Student> = mutableSetOf(),
    var maxSize: Int = 1,
    var size: Int = 0,

) : ExpObservervableBase() {
    var xp: Float = 10f
    var xpModifier: Float = 0f

    fun finish() { // could also be called by study group
        completed = true
        xpModifier = size / maxSize + 0.0f

        this.notifyObservers(xp * xpModifier)
    }
    fun registerStudent(student: Student) {
        if (maxSize == size) {
            // throw error
            return
        }
        size += 1
        // mby increase xpModifier for each student that joins
        this.register(student)
    }

    fun deregisterStudent(student: Student) {
        if (size == 0) {
            return
        }
        size -= 1
        this.deregister(student)
    }
}
