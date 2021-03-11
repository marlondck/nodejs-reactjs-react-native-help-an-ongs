import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

function Detail() {
  const navigation = useNavigation();
  const message = 'Olá Apae, estou entrando em contato pois gostaria de ajudar no caso "Nomedocaso" com valor de R$ 120,00';

  function navigateToIncidents() {
    navigation.navigate('Incidents');
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: nome do caso`,
      recipients: ['email@email.com'],
      body: message
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+5511111111&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Image source={logoImg} />
          <TouchableOpacity onPress={navigateToIncidents}>
            <Feather name="arrow-left" size={28} color="#e82041"/>
          </TouchableOpacity>
      </View>

      <View style={styles.incidentCard}>
        <Text style={[styles.incidentProperty], {marginTop: 0, fontWeight:'bold'}}>ONG:</Text>
        <Text style={styles.incidentValue}>APAE</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>uma descricao</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>R$ 120,00</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={sendWhatsapp}>
              <Text style={styles.actionButtonText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={sendMail}>
              <Text style={styles.actionButtonText}>E-mail</Text>
            </TouchableOpacity>
          </View>
      </View>

    </View>
  );
}

export default Detail;