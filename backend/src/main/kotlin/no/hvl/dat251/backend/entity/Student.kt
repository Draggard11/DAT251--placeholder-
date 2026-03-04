package no.hvl.dat251.backend.entity

import jakarta.persistence.*

@Entity
class Student(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    var name: String


) {

}