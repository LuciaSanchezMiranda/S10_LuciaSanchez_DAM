import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '../components/common/app-button';
import { AppInput } from '../components/common/app-input';
import {
  validarCategoria,
  validarNombreProducto,
  validarPrecio,
  validarStock,
} from '../utils/validators';

export default function RegistroProductos() {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);

  const nombreValido = validarNombreProducto(nombre);
  const categoriaValida = validarCategoria(categoria);
  const precioValido = validarPrecio(precio);
  const stockValido = validarStock(stock);
  const validaciones = [nombreValido, categoriaValida, precioValido, stockValido];
  const validacionesCompletas = validaciones.filter(Boolean).length;

  const actualizar = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setError('');
    setRegistrado(false);
  };

  const guardarProducto = () => {
    setRegistrado(false);

    if (!nombreValido) {
      setError('Escribe un nombre de producto de al menos 3 caracteres.');
      return;
    }
    if (!categoriaValida) {
      setError('Indica la categoría del producto.');
      return;
    }
    if (!precioValido) {
      setError('El precio debe ser un número mayor que 0.');
      return;
    }
    if (!stockValido) {
      setError('El stock debe ser un número entero igual o mayor que 0.');
      return;
    }

    setError('');
    setRegistrado(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>＋</Text>
          </View>
          <View style={styles.headerCopy}>
            <Text style={styles.overline}>INVENTARIO · NUEVO</Text>
            <Text style={styles.title}>Registrar producto</Text>
          </View>
        </View>
        <Text style={styles.description}>
          Completa los datos para agregar un producto a tu inventario.
        </Text>

        <View style={styles.formCard}>
          <View style={styles.sectionHeading}>
            <View style={styles.sectionCopy}>
              <Text style={styles.sectionTitle}>Datos del producto</Text>
              <Text style={styles.sectionDescription}>Todos los campos son obligatorios.</Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.counterText}>{validacionesCompletas}/4</Text>
            </View>
          </View>

          <AppInput
            label="Nombre del producto"
            placeholder="Ej. Café molido"
            value={nombre}
            onChangeText={actualizar(setNombre)}
          />
          <FieldStatus value={nombre} valid={nombreValido} validLabel="Nombre válido" invalidLabel="Mínimo 3 caracteres" />

          <AppInput
            label="Categoría"
            placeholder="Ej. Alimentos y bebidas"
            value={categoria}
            onChangeText={actualizar(setCategoria)}
          />
          <FieldStatus value={categoria} valid={categoriaValida} validLabel="Categoría indicada" invalidLabel="Este campo es obligatorio" />

          <AppInput
            label="Precio (S/)"
            placeholder="0.00"
            value={precio}
            onChangeText={actualizar(setPrecio)}
            keyboardType="decimal-pad"
          />
          <FieldStatus value={precio} valid={precioValido} validLabel="Precio válido" invalidLabel="Ingresa un monto mayor que 0" />

          <AppInput
            label="Stock disponible"
            placeholder="0"
            value={stock}
            onChangeText={actualizar(setStock)}
            keyboardType="number-pad"
          />
          <FieldStatus value={stock} valid={stockValido} validLabel="Cantidad válida" invalidLabel="Usa un entero igual o mayor que 0" />

          {error !== '' && (
            <View style={styles.errorBox} accessibilityRole="alert">
              <View style={styles.errorIcon}><Text style={styles.errorIconText}>!</Text></View>
              <View style={styles.messageContainer}>
                <Text style={styles.errorTitle}>Revisa los datos</Text>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>
          )}

          {registrado && (
            <View style={styles.successBox} accessibilityRole="alert">
              <View style={styles.successIcon}><Text style={styles.successIconText}>✓</Text></View>
              <View style={styles.messageContainer}>
                <Text style={styles.successTitle}>¡Producto registrado!</Text>
                <Text style={styles.successMessage}>
                  {nombre.trim()} · S/ {Number(precio.replace(',', '.')).toFixed(2)} · Stock: {stock}
                </Text>
              </View>
            </View>
          )}

          <AppButton title="Registrar producto" onPress={guardarProducto} />
        </View>

        <View style={styles.validationSection}>
          <View style={styles.validationHeader}>
            <View>
              <Text style={styles.validationTitle}>Validaciones</Text>
              <Text style={styles.validationSubtitle}>Reglas aplicadas en tiempo real</Text>
            </View>
            <View style={styles.validationCount}>
              <Text style={styles.validationCountText}>{validacionesCompletas}/4</Text>
            </View>
          </View>
          <ValidationRow title="Nombre del producto" description="Obligatorio y con al menos 3 caracteres." valid={nombreValido} />
          <ValidationRow title="Categoría" description="Debe contener al menos 2 caracteres." valid={categoriaValida} />
          <ValidationRow title="Precio" description="Debe ser un valor numérico mayor que cero." valid={precioValido} />
          <ValidationRow title="Stock" description="Debe ser un entero igual o mayor que cero." valid={stockValido} />
        </View>

        <Text style={styles.footer}>Formulario local · Los datos no se envían a un servidor</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FieldStatus({ value, valid, validLabel, invalidLabel }: {
  value: string;
  valid: boolean;
  validLabel: string;
  invalidLabel: string;
}) {
  if (!value) return <View style={styles.fieldStatusSpacer} />;
  return (
    <Text style={[styles.fieldStatus, valid ? styles.validText : styles.invalidText]}>
      {valid ? `✓ ${validLabel}` : `○ ${invalidLabel}`}
    </Text>
  );
}

function ValidationRow({ title, description, valid }: {
  title: string;
  description: string;
  valid: boolean;
}) {
  return (
    <View style={styles.validationRow}>
      <View style={[styles.validationCircle, valid ? styles.validationCircleValid : styles.validationCirclePending]}>
        <Text style={[styles.validationIcon, valid ? styles.validationIconValid : styles.validationIconPending]}>
          {valid ? '✓' : '○'}
        </Text>
      </View>
      <View style={styles.validationInfo}>
        <Text style={styles.validationRowTitle}>{title}</Text>
        <Text style={styles.validationRowDescription}>{description}</Text>
      </View>
      <View style={[styles.statusBadge, valid ? styles.statusBadgeValid : styles.statusBadgePending]}>
        <Text style={[styles.statusBadgeText, valid ? styles.statusBadgeTextValid : styles.statusBadgeTextPending]}>
          {valid ? 'OK' : 'Pendiente'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB' },
  scroll: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: 20, paddingTop: 42, paddingBottom: 36 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerIcon: { width: 50, height: 50, borderRadius: 16, backgroundColor: '#EAF1FF', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  headerIconText: { color: '#315FEA', fontSize: 30, fontWeight: '500', lineHeight: 34 },
  headerCopy: { flex: 1 },
  overline: { fontSize: 10, fontWeight: '800', color: '#315FEA', letterSpacing: 1.4, marginBottom: 4 },
  title: { fontSize: 25, fontWeight: '800', color: '#172033' },
  description: { fontSize: 14, lineHeight: 21, color: '#667085', marginBottom: 22 },
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 20, borderWidth: 1, borderColor: '#E5EAF2', marginBottom: 16, shadowColor: '#172033', shadowOpacity: 0.04, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 2 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  sectionCopy: { flex: 1, paddingRight: 10 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#172033', marginBottom: 4 },
  sectionDescription: { fontSize: 12, color: '#8A94A6' },
  counter: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#EEF3FF', alignItems: 'center', justifyContent: 'center' },
  counterText: { color: '#315FEA', fontSize: 13, fontWeight: '800' },
  fieldStatus: { fontSize: 11, fontWeight: '600', marginTop: -9, marginBottom: 12 },
  fieldStatusSpacer: { height: 5 },
  validText: { color: '#16834B' },
  invalidText: { color: '#C47A12' },
  errorBox: { flexDirection: 'row', backgroundColor: '#FFF5F5', borderRadius: 14, padding: 13, marginTop: 2, marginBottom: 16, borderWidth: 1, borderColor: '#FECACA' },
  errorIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  errorIconText: { color: '#DC2626', fontSize: 16, fontWeight: '800' },
  messageContainer: { flex: 1 },
  errorTitle: { color: '#991B1B', fontSize: 13, fontWeight: '800', marginBottom: 2 },
  errorMessage: { color: '#B42318', fontSize: 12, lineHeight: 17 },
  successBox: { flexDirection: 'row', backgroundColor: '#F0FDF4', borderRadius: 14, padding: 13, marginTop: 2, marginBottom: 16, borderWidth: 1, borderColor: '#BBF7D0' },
  successIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  successIconText: { color: '#16A34A', fontSize: 16, fontWeight: '800' },
  successTitle: { color: '#166534', fontSize: 13, fontWeight: '800', marginBottom: 2 },
  successMessage: { color: '#15803D', fontSize: 12, lineHeight: 17 },
  validationSection: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 18, borderWidth: 1, borderColor: '#E5EAF2' },
  validationHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  validationTitle: { fontSize: 17, fontWeight: '800', color: '#172033', marginBottom: 3 },
  validationSubtitle: { fontSize: 12, color: '#8A94A6' },
  validationCount: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10, backgroundColor: '#EEF3FF' },
  validationCountText: { color: '#315FEA', fontSize: 12, fontWeight: '800' },
  validationRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F0F2F5' },
  validationCircle: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  validationCircleValid: { backgroundColor: '#DCFCE7' },
  validationCirclePending: { backgroundColor: '#F3F4F6' },
  validationIcon: { fontSize: 15, fontWeight: '800' },
  validationIconValid: { color: '#16A34A' },
  validationIconPending: { color: '#98A2B3' },
  validationInfo: { flex: 1 },
  validationRowTitle: { fontSize: 12, fontWeight: '700', color: '#344054', marginBottom: 3 },
  validationRowDescription: { fontSize: 10, color: '#8A94A6', lineHeight: 15 },
  statusBadge: { paddingHorizontal: 7, paddingVertical: 5, borderRadius: 8, marginLeft: 6 },
  statusBadgeValid: { backgroundColor: '#ECFDF3' },
  statusBadgePending: { backgroundColor: '#F2F4F7' },
  statusBadgeText: { fontSize: 9, fontWeight: '800' },
  statusBadgeTextValid: { color: '#027A48' },
  statusBadgeTextPending: { color: '#667085' },
  footer: { textAlign: 'center', fontSize: 11, color: '#98A2B3', marginTop: 18 },
});
