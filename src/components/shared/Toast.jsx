import { useToast } from '../../hooks/useToast'

export default function Toast() {
  const { toast, hideToast } = useToast()
  if (!toast) return null
  return <div className={`toast toast-${toast.type}`} onClick={hideToast}>{toast.msg}</div>
}
