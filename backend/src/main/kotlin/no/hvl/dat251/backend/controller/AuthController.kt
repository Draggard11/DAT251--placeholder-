package no.hvl.dat251.backend.controller

import jakarta.servlet.http.HttpServletRequest
import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.repository.StudentRepository
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val studentRepository: StudentRepository,
    private val passwordEncoder: PasswordEncoder
) {
    @GetMapping("/test")
    fun test() = "Auth controller works"

    @PostMapping("/login")
    fun login(
        @RequestBody request: LoginRequest,
        httpRequest: HttpServletRequest
    ): ResponseEntity<String> {

        val authToken = UsernamePasswordAuthenticationToken(
            request.email,
            request.password
        )

        val authentication = authenticationManager.authenticate(authToken)

        val context = SecurityContextHolder.createEmptyContext()
        context.authentication = authentication
        SecurityContextHolder.setContext(context)

        val session = httpRequest.getSession(true)
        session.setAttribute(
            HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
            context
        )

        return ResponseEntity.ok("Logged in")
    }

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<Any> {

        if (studentRepository.findByEmail(request.email).isPresent) {
            return ResponseEntity.badRequest().body("Email already in use")
        }
        val student = Student(
            name = request.name,
            email = request.email,

            passwordHash = passwordEncoder.encode(request.password)!!
        )

        val saved = studentRepository.save(student)

        return ResponseEntity.status(201).body(
            StudentResponse(
                id = saved.id,
                name = saved.name,
                email = saved.email
            )
        )
    }
}

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String = ""
)

data class LoginRequest(
    val email: String,
    val password: String
)

data class StudentResponse(
    val id: Long?,
    val name: String,
    val email: String
)