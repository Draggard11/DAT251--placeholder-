package no.hvl.dat251.backend.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import no.hvl.dat251.backend.exp.Exp
import no.hvl.dat251.backend.exp.ExpObservervableBase
import java.util.Date

@Entity
class StudySession(

    var title: String,
    var maxSize: Int, // might not be needed or be set to constant
    var startTime: Date,
    var endTime: Date,
    @Transient
    var subject: Subject? = null,
    var description: String? = null,
    ) : ExpObservervableBase() {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
    var size: Int = 0
    @Transient
    private val xp: Exp = Exp(0f,0f)
    var completed: Boolean = false

    fun finish() {// could also be called by study group
        completed = true
        this.notifyObservers(xp.calculate())
    }

    fun registerStudent(student: Student) {
        if (maxSize == size) {
            // throw error
            return
        }
        size += 1
        xp.xpModifier += 1 / maxSize
        // mby increase xpModifier for each student that joins
        this.register(student)
    }
    fun deregisterStudent(student: Student) {
        if (size == 0) {
            return
        }
        size -= 1
        xp.xpModifier -= 1 / maxSize
        this.deregister(student)
    }
}
