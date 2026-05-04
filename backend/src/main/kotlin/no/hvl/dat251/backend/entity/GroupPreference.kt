package no.hvl.dat251.backend.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne

@Entity
class GroupPreference(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    // Who owns this preference
    @ManyToOne
    var student: Student? = null,

    // For which subject
    @ManyToOne
    var subject: Subject? = null,

    // Who they prefer
    var preferredStudentID: Long? = null
)