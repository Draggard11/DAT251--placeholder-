package no.hvl.dat251.backend.entity

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany

@Entity
class FlashCard(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var question: String? = null,
    var answer: String? = null,
    @ManyToOne(cascade = [(CascadeType.MERGE)])
    var student: Student? = null,
    ) {
    companion object {
        fun create(fDto: FlashCardDto): FlashCard = FlashCard(question = fDto.question, answer = fDto.answer)
    }
}

data class FlashCardDto(
    var question: String,
    var answer: String,
)