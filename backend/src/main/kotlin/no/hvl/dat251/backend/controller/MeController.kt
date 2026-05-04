package no.hvl.dat251.backend.controller

import no.hvl.dat251.backend.entity.Student
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


//testing
@RestController
class MeController {

    @GetMapping("/me")
    fun me(authentication: Authentication?): Any {
        val student = authentication?.principal as? Student

        return student?.let {
            StudentDTO(
                id = it.id,
                name = it.name,
                email = it.email
            )
        } ?: "Not logged in"
    }

    data class StudentDTO(
        val id: Long?,
        val name: String,
        val email: String
    )
}