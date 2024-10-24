import SignUpView from './index';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../../config'
const queryClient = new QueryClient()
const SignupWagmi = () => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <main>
                    <SignUpView />
                </main>
            </QueryClientProvider>
        </WagmiProvider>

    );
}
export default SignupWagmi