/**
 * Tenant utilities
 * 
 * For MVP, we'll use a mock tenant ID.
 * In production, this should fetch from Supabase Auth session.
 */

// TODO: Replace with actual tenant fetching from auth session
export async function getCurrentTenantId(): Promise<string> {
  // Mock tenant ID for development
  // In production, fetch from Supabase Auth session
  const mockTenantId = process.env.MOCK_TENANT_ID || '00000000-0000-0000-0000-000000000000'
  
  // Uncomment when auth is ready:
  // const supabase = await createServerClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) throw new Error('Not authenticated')
  // 
  // const { data: tenant } = await supabase
  //   .from('tenants')
  //   .select('id')
  //   .eq('owner_id', user.id)
  //   .single()
  // 
  // if (!tenant) throw new Error('Tenant not found')
  // return tenant.id
  
  return mockTenantId
}
