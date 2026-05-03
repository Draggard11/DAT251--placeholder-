package no.hvl.dat251.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "Group_generation_pool")
class GroupGenerationPool (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    var open: Boolean = true
    )
