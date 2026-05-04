package no.hvl.dat251.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import no.hvl.dat251.backend.exp.Exp
import no.hvl.dat251.backend.exp.ExpObserver
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.time.LocalDate

@Entity
@Table(name = "STUDENTS")
class Student(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @Column(nullable = false)
    var name: String = "",
    @Column(unique = true, nullable = false)
    var email: String = "", // spring uses it as username
    @Column(nullable = false)
    var passwordHash: String = "",
    var dateOfBirth: LocalDate? = null,
    var enrollmentDate: LocalDate? = null,
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var activeSubjects: MutableSet<Subject> = mutableSetOf(),
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var completedSubjects: MutableSet<Subject> = mutableSetOf(),
    @OneToMany(cascade = [(CascadeType.MERGE)])
    var studygroups: MutableSet<StudyGroup> = mutableSetOf(),
    //Map of subject to list of students
    @Transient
    var groupPreferences: MutableMap<Long?, Set<Long?>> = mutableMapOf(),

    @OneToMany(cascade = [(CascadeType.MERGE)])
    var flashCards: MutableSet<FlashCard> = mutableSetOf(),
    //TODO add flashcards connected to subject
    var xp: Float = 0f,
) : ExpObserver, UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> = mutableListOf()

    override fun isAccountNonExpired() = true
    override fun isAccountNonLocked() = true
    override fun isCredentialsNonExpired() = true
    override fun isEnabled() = true

    override fun getUsername(): String = email
    override fun getPassword(): String? = passwordHash

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