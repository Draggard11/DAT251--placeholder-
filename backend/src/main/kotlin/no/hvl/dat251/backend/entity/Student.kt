package no.hvl.dat251.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
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
) : ExpObserver {
    var xp: Float = 0f
    fun addStudyGroup(studyGroup: StudyGroup) {
        studygroups.add(studyGroup)
    }
    fun removeStudyGroup(studyGroup: StudyGroup) {
        studygroups.remove(studyGroup)
    }
    fun addActiveSubject(subject: Subject) {
        activeSubjects.add(subject)
    }

    override fun update(xp: Float) {
        // we can notify the user from the backend
        // it would be best to let frontend deal with notifying the user and use GET if a session is claimed finished
        this.xp += xp
    }
}