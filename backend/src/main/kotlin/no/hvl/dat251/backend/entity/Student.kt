package no.hvl.dat251.backend.entity

import jakarta.persistence.*
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
    var studygroups: MutableSet<StudyGroup> = mutableSetOf()

) : UserDetails {

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

}