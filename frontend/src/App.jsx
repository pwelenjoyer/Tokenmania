import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import ApproveSpender from './TokenApprove';
import AuthWarning from './AuthWarning';
import BalanceChecker from './BalanceChecker';
import Header from './Header';
import TransferFrom from './TokenTransfer';
import TokenInfo from './TokenInfo';
import TokenSender from './TokenSender';
import CreateToken from './CreateToken';

// Lista dozwolonych numerów Internet Identity – upewnij się, że format odpowiada zwracanemu przez getUserNumber()
const allowedUserNumbers = [
  "bum-bec",    // Twój numer Internet Identity
  "2738903"    // Numer Internet Identity Twojego kolegi
];

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [totalSupply, setTotalSupply] = useState('');
  const [actor, setActor] = useState();
  const [tokenCreated, setTokenCreated] = useState(false);
  const [decimals, setDecimals] = useState(0n);

  useEffect(() => {
    async function initAuth() {
      const authClient = await AuthClient.create();
      await authClient.login({
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toText();
          console.log("Principal:", principal);
          
          let userNumber = await authClient.getUserNumber();
          console.log("User number from getUserNumber():", userNumber);
          
          // Jeśli userNumber nie jest stringiem, przekonwertuj go na string
          if (typeof userNumber !== "string") {
            userNumber = String(userNumber);
          }
          
          setIsAuthenticated(true);
          
          // Porównaj otrzymany numer z listą dozwolonych
          if (allowedUserNumbers.includes(userNumber)) {
            setHasPermission(true);
          } else {
            console.warn("Brak uprawnień. Dozwolone numery:", allowedUserNumbers, "Otrzymany numer:", userNumber);
          }
        }
      });
    }
    initAuth();
  }, []);

  const updateSupply = async () => {
    try {
      const supply = await actor.icrc1_total_supply();
      const decimals = BigInt(await actor.icrc1_decimals());
      setTotalSupply(`${Number(supply) / Number(10n ** decimals)}`);
      setDecimals(decimals);
    } catch (error) {
      console.error('Error fetching total supply:', error);
    }
  };

  const checkTokenCreated = async () => {
    try {
      const result = await actor.token_created();
      setTokenCreated(result);
    } catch (error) {
      console.error('Error fetching token created status:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated || tokenCreated) {
      updateSupply();
    }
  }, [isAuthenticated, tokenCreated]);

  useEffect(() => {
    if (actor) {
      checkTokenCreated();
    }
  }, [actor]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        actor={actor}
        setActor={setActor}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        tokenCreated={tokenCreated}
        setTokenCreated={setTokenCreated}
      />
      {tokenCreated ? (
        <div>
          <TokenInfo totalSupply={totalSupply} />
          <div className="mx-auto">
            {isAuthenticated ? (
              <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-4 lg:grid-cols-3">
                <BalanceChecker decimals={decimals} />
                <TokenSender actor={actor} updateSupply={updateSupply} decimals={decimals} />
                <ApproveSpender actor={actor} decimals={decimals} />
                <TransferFrom actor={actor} decimals={decimals} />
              </div>
            ) : (
              <AuthWarning />
            )}
          </div>
        </div>
      ) : (
        <div>
          {isAuthenticated ? (
            hasPermission ? (
              <CreateToken actor={actor} setTokenCreated={setTokenCreated} />
            ) : (
              <div>Nie masz uprawnień do infocoinów. Wróć na lekcje i zbierz je czy coś.</div>
            )
          ) : (
            <AuthWarning />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
