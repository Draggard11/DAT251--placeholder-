package no.hvl.dat251.backend.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import no.hvl.dat251.backend.exp.Exp
import no.hvl.dat251.backend.exp.ExpObserver
import no.hvl.dat251.backend.exp.ExpObservervableBase
import java.util.Date

@Entity
class StudySession(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val subject: String? = null,
    var size: Int = 0,
    val maxSize: Int?, // might not be needed or be set to constan // might not be needed or be set to constantt
    val startTime: Date? = null,
    val endTime: Date? = null,
    val completed: Boolean = false,
    val xp: Exp,
    // TODO make a experience generator for easier calculation of experience
) : ExpObservervableBase() {
    fun registerStudent(student: Student) {
        // mby increase xpModifier for each student that joins
        this.register(student)
    }

    fun deregisterStudent(student: Student) {
        this.deregister(student)
    }
}
