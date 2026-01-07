import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Plane, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { loginSuccess, registerSuccess } from '@/features/auth/authSlice';
import { usersData } from '@/data/users';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '', rememberMe: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = usersData.find((u) => u.email === formData.email && u.password === formData.password);
      if (user) {
        dispatch(loginSuccess({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, role: user.role, rememberMe: formData.rememberMe }));
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (usersData.find((u) => u.email === formData.email)) {
        setError('Email already exists');
        return;
      }
      const newUser = { id: `user-${Date.now()}`, email: formData.email, firstName: formData.firstName, lastName: formData.lastName };
      dispatch(registerSuccess({ user: newUser, role: 'user' }));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="text-primary-foreground max-w-md">
          <div className="flex items-center gap-2 mb-8"><div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center"><Plane className="w-7 h-7" /></div><span className="font-display font-bold text-2xl">TravelWorld</span></div>
          <h2 className="font-display text-4xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-primary-foreground/80">Join thousands of travelers discovering amazing destinations around the world.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-muted-foreground mb-8">{isLogin ? 'Sign in to continue your adventure' : 'Join us and explore the world'}</p>

          {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name</Label><Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required /></div>
                <div><Label>Last Name</Label><Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required /></div>
              </div>
            )}
            <div><Label>Email</Label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input type="email" className="pl-10" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div></div>
            <div><Label>Password</Label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input type="password" className="pl-10" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required /></div></div>
            {isLogin && <div className="flex items-center gap-2"><Checkbox checked={formData.rememberMe} onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked })} /><Label className="text-sm">Remember me</Label></div>}
            <Button type="submit" className="w-full" size="lg">{isLogin ? 'Sign In' : 'Create Account'}</Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">{isLogin ? "Don't have an account?" : 'Already have an account?'} <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">{isLogin ? 'Sign up' : 'Sign in'}</button></p>
          <p className="text-center text-xs text-muted-foreground mt-4">Demo: admin@travelworld.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
