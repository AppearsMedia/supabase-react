import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://sxghraaagljxkgzjfyzf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Z2hyYWFhZ2xqeGtnempmeXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4OTQ3MjgsImV4cCI6MjAzMjQ3MDcyOH0.oHDOs65U7dhYO_Z3ts470ks8GLxugD_UmVnwPRhnyRw')

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])


  const logout = async () => {
   await supabase.auth.signOut()
  }

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<div><button onClick={() => logout()}>Logout</button></div>)
  }
}