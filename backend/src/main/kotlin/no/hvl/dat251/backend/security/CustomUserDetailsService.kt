package no.hvl.dat251.backend.security


import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.repository.StudentRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.*

@Service
class CustomUserDetailsService(
    private val repo: StudentRepository
) : UserDetailsService {

    override fun loadUserByUsername(email: String): UserDetails {
        return repo.findByEmail(email)
            .orElseThrow { UsernameNotFoundException("User not found") }
    }
}