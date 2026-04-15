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
import jakarta.transaction.Transactional
import no.hvl.dat251.backend.exp.Exp
import no.hvl.dat251.backend.exp.ExpObservervableBase
import java.util.Date

@Entity
class StudySession(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var subject: String? = null,
    var startTime: Date? = null,
    var endTime: Date? = null,
    var completed: Boolean? = false,
    var location: String? = null,
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
    @Transient
    private val xp: Exp = Exp(50f, 0f)

    fun finish() { // could also be called by study group
        completed = true
        xp.xpModifier = size / maxSize + 0.0f
        this.notifyObservers(xp.calculate())
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
