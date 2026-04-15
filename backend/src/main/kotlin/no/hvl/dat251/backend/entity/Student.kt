package no.hvl.dat251.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType.LAZY
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToMany
import jakarta.persistence.OneToMany
import jakarta.persistence.OneToOne
import jakarta.persistence.Table
import jakarta.persistence.Transient
import jakarta.transaction.Transactional
import no.hvl.dat251.backend.exp.Exp
import no.hvl.dat251.backend.exp.ExpObserver
import java.time.LocalDate

@Entity
@Table(name = "STUDENTS")
class Student(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var name: String,
    var email: String? = null,
    var dateOfBirth: LocalDate? = null,
    var enrollmentDate: LocalDate? = null,
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var activeSubjects: MutableSet<Subject> = mutableSetOf(),
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var completedSubjects: MutableSet<Subject> = mutableSetOf(),
    @OneToMany(cascade = [(CascadeType.MERGE)])
    var studygroups: MutableSet<StudyGroup> = mutableSetOf(),
    var xp: Float = 0f,
) : ExpObserver {
    fun addStudyGroup(studyGroup: StudyGroup) {
        studygroups.add(studyGroup)
    }

    fun removeStudyGroup(studyGroup: StudyGroup) {
        studygroups.remove(studyGroup)
    }

    fun addActiveSubject(subject: Subject) {
        activeSubjects.add(subject)
    }

    @Transactional
    override fun update(xp: Float) {
        // we can notify the user from the backend
        // it would be best to let frontend deal with notifying the user and use GET if a session is claimed finished
        this.xp += xp
    }
}
