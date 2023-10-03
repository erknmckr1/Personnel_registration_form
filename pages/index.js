import CustomButton from '@/components/cila_components/CustomButton'
import { useRouter } from 'next/router'
import React from 'react'

function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const handleCilaClick = () => {
   
    router.push('/operatorCilaScreen');
  };
  const handleOperatorClick = () => {
   
    router.push('/operatorEditScreen');
  };
  return (
    <div>
    <CustomButton onClick={handleCilaClick} title="Cila"/>
    <CustomButton onClick={handleOperatorClick} title="Operator Edit"/>
    </div>
  )
}
export default index