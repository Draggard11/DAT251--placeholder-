package no.hvl.dat251.backend.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "Group_generation_request")
class GroupGenerationRequest (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    val pool: GroupGenerationPool? = null,

    @ManyToOne
    val student: Student? = null,

    @ElementCollection
    val preferredStudentIds: List<Long> = emptyList()
)