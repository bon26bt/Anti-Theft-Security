plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}
android {
    namespace = "com.bonat.antitheft"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.bonat.antitheft"
        minSdk = 26
        targetSdk = 35
        versionCode = 5
        versionName = "1.4"
        buildConfigField("String", "ALERT_URL", "\"${project.findProperty("ALERT_URL") ?: ""}\"")
        buildConfigField("String", "ALERT_TOKEN", "\"${project.findProperty("ALERT_TOKEN") ?: ""}\"")
    }
    buildFeatures { buildConfig = true }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}
dependencies {
    implementation("com.google.android.gms:play-services-location:21.3.0")
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
}
